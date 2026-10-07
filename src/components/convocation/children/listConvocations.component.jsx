import { useCallback, useEffect, useState } from "react";
import { Card, Empty, message } from "antd";
import { isEmpty } from "lodash";
import { getAllConvocations } from "../../../services/convocation.service";
import { LIST_CONVOCATIONS_ICONS } from "../../../schema/listConvocation.schema";
import ConvocationDetail from "./convocationDetail.component";
import ConvocationForm from "./convocationForm.component";

const ListConvocations = () => {
  const [convocations, setConvocations] = useState([]);
  const [selectedConvocationId, setSelectedConvocationId] = useState(null);
  const [editingConvocation, setEditingConvocation] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let ignore = false;
    getAllConvocations().then((data) => {
      if (!ignore && data != undefined) setConvocations(data);
    });
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  // Back from the detail the list is fetched again, so it shows the latest edits.
  const backToList = useCallback(() => {
    setSelectedConvocationId(null);
    setReloadKey((key) => key + 1);
  }, []);

  const onConvocationUpdated = useCallback(() => {
    setEditingConvocation(null);
    messageApi.success("Convocatoria actualizada");
  }, [messageApi]);

  let content;
  if (editingConvocation !== null) {
    content = (
      <ConvocationForm
        convocation={editingConvocation}
        onSaved={onConvocationUpdated}
        onCancel={() => setEditingConvocation(null)}
      />
    );
  } else if (selectedConvocationId !== null) {
    content = (
      <div className="convocation-content">
        <ConvocationDetail
          convocationId={selectedConvocationId}
          onBack={backToList}
          onEdit={setEditingConvocation}
        />
      </div>
    );
  } else {
    content = (
      <div className="convocation-content">
        <div className="convocation-list">
          {!isEmpty(convocations) &&
            convocations.map(({ id, title, ...convocation }) => {
              const keys = Object.keys(LIST_CONVOCATIONS_ICONS);
              return (
                <Card
                  key={id}
                  className="convocation-list__card"
                  hoverable
                  onClick={() => setSelectedConvocationId(id)}
                >
                  <div className="convocation-list__card--title">{title}</div>
                  {keys.map((key, keyIndex) => {
                    const Icon = LIST_CONVOCATIONS_ICONS[key];
                    return (
                      <div
                        className="convocation-list__card--item"
                        key={keyIndex}
                      >
                        <Icon />
                        {convocation[key]}
                      </div>
                    );
                  })}
                </Card>
              );
            })}
        </div>
        {isEmpty(convocations) && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="convocation-list__empty"
          />
        )}
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      {content}
    </>
  );
};

export default ListConvocations;
