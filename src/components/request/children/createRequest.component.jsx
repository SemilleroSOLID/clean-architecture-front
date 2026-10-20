import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Form, Popconfirm, Result, Spin, Steps, message } from "antd";
import { ArrowLeftOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { getAllConvocations } from "../../../services/convocation.service";
import { getAllStudents } from "../../../services/student.service";
import { createRequest } from "../../../services/request.service";
import { buildRequestFormItems } from "../../../schema/createRequest.schema";
import { REQUEST_STEPS } from "../../../constants/request.constant";
import { isReceivingRequests, toRequestPayload, toRequirementFieldErrors } from "../../../utils/request.util";
import CommonForm from "../../common/inputs/form.component";
import SelectConvocation from "./selectConvocation.component";
import RequestReview from "./requestReview.component";
import RequestResult from "./requestResult.component";

const STEP = { SELECT: 0, REQUIREMENTS: 1, REVIEW: 2, RESULT: 3 };

// CU-002: a student applies to an open convocation giving a value for each requirement.
const CreateRequest = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [students, setStudents] = useState([]);
  const [convocations, setConvocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [step, setStep] = useState(STEP.SELECT);
  const [studentId, setStudentId] = useState(undefined);
  const [convocationId, setConvocationId] = useState(undefined);
  const [values, setValues] = useState({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let ignore = false;
    Promise.all([getAllStudents(), getAllConvocations()])
      .then(([studentList, convocationList]) => {
        if (ignore) return;
        setStudents(studentList);
        setConvocations(convocationList.filter((convocation) => isReceivingRequests(convocation)));
      })
      .catch((error) => !ignore && setLoadError(error.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  const student = students.find(({ id }) => id === studentId);
  const convocation = convocations.find(({ id }) => id === convocationId);
  const requirements = useMemo(() => convocation?.convocationRequirements ?? [], [convocation]);
  const formItems = useMemo(() => buildRequestFormItems(requirements), [requirements]);

  const changeConvocation = useCallback(
    (id) => {
      setConvocationId(id);
      setValues({});
      form.resetFields();
    },
    [form]
  );

  const review = useCallback((formValues) => {
    setValues(formValues);
    setSubmitError(null);
    setStep(STEP.REVIEW);
  }, []);

  const send = useCallback(async () => {
    setSending(true);
    setSubmitError(null);
    try {
      const created = await createRequest(toRequestPayload({ studentId, convocationId }, requirements, values));
      setResult(created);
      setStep(STEP.RESULT);
    } catch (error) {
      messageApi.error(error.message);
      const fieldErrors = toRequirementFieldErrors(error.fieldErrors);
      if (fieldErrors.length > 0) {
        form.setFields(fieldErrors);
        setStep(STEP.REQUIREMENTS);
      } else {
        setSubmitError(error.message);
      }
    } finally {
      setSending(false);
    }
  }, [messageApi, form, studentId, convocationId, requirements, values]);

  const startOver = useCallback(() => {
    setStep(STEP.SELECT);
    setConvocationId(undefined);
    setValues({});
    setResult(null);
    setSubmitError(null);
    form.resetFields();
  }, [form]);

  if (loading) {
    return (
      <Card className="request">
        <div className="request__loading">
          <Spin />
        </div>
      </Card>
    );
  }

  if (loadError) {
    return (
      <Card className="request">
        <Result status="error" title="No se pudo cargar la información" subTitle={loadError} />
      </Card>
    );
  }

  return (
    <Card className="request" title="Postularse a una convocatoria">
      {contextHolder}
      <Steps
        className="request__steps"
        current={step}
        status={step === STEP.RESULT ? "finish" : "process"}
        items={REQUEST_STEPS}
      />

      {step === STEP.SELECT && (
        <SelectConvocation
          students={students}
          convocations={convocations}
          studentId={studentId}
          convocation={convocation}
          onStudentChange={setStudentId}
          onConvocationChange={changeConvocation}
        />
      )}

      {/* The form stays mounted while reviewing, so going back keeps what the student typed. */}
      {convocation && (
        <div className="request-form" hidden={step !== STEP.REQUIREMENTS}>
          <div className="request__subtitle">Ingrese su valor para cada requisito de {convocation.title}</div>
          <CommonForm form={form} id="request-form" layout="vertical" onFinish={review} inputItems={formItems} />
        </div>
      )}

      {step === STEP.REVIEW && (
        <RequestReview student={student} convocation={convocation} values={values} error={submitError} />
      )}

      {step === STEP.RESULT && <RequestResult result={result} onNewRequest={startOver} />}

      <div className="request__actions">
        {step === STEP.SELECT && (
          <Button type="primary" disabled={!studentId || !convocation} onClick={() => setStep(STEP.REQUIREMENTS)}>
            Continuar
          </Button>
        )}
        {step === STEP.REQUIREMENTS && (
          <>
            <Button icon={<ArrowLeftOutlined />} onClick={() => setStep(STEP.SELECT)}>
              Atrás
            </Button>
            <Button type="primary" htmlType="submit" form="request-form">
              Revisar
            </Button>
          </>
        )}
        {step === STEP.REVIEW && (
          <>
            <Button icon={<EditOutlined />} onClick={() => setStep(STEP.REQUIREMENTS)} disabled={sending}>
              Modificar
            </Button>
            <Popconfirm
              title="¿Enviar la solicitud?"
              description="Después de enviarla no podrá modificar los valores."
              okText="Enviar"
              cancelText="Cancelar"
              onConfirm={send}
            >
              <Button type="primary" icon={<SendOutlined />} loading={sending}>
                Enviar solicitud
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </Card>
  );
};

export default CreateRequest;
