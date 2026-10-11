import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Card, Empty, Select, Tag, message } from "antd";
import { isEmpty } from "lodash";
import { getAllConvocations } from "../../../services/convocation.service";
import {
  ALL_OPTION,
  LIST_CONVOCATIONS_FIELDS,
  LIST_CONVOCATIONS_SORT_OPTIONS,
  STATE_FILTER_OPTIONS,
  TYPE_FILTER_OPTIONS,
} from "../../../schema/listConvocation.schema";
import { formatDate } from "../../../utils/date.util";
import ConvocationDetail from "./convocationDetail.component";
import ConvocationForm from "./convocationForm.component";

const ListConvocations = () => {
  const [convocations, setConvocations] = useState([]);
  const [selectedConvocationId, setSelectedConvocationId] = useState(null);
  const [editingConvocation, setEditingConvocation] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [sortBy, setSortBy] = useState(LIST_CONVOCATIONS_SORT_OPTIONS[0].value);
  const [typeFilter, setTypeFilter] = useState(ALL_OPTION);
  const [stateFilter, setStateFilter] = useState(ALL_OPTION);
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

  const visibleConvocations = useMemo(() => {
    const { compare } = LIST_CONVOCATIONS_SORT_OPTIONS.find(({ value }) => value === sortBy);
    return convocations
      .filter(({ type }) => typeFilter === ALL_OPTION || type === typeFilter)
      .filter(({ state }) => stateFilter === ALL_OPTION || state === stateFilter)
      .toSorted(compare);
  }, [convocations, sortBy, typeFilter, stateFilter]);

  // Back from the detail the list is fetched again, so it shows the latest edits.
  const backToList = useCallback(() => {
    setSelectedConvocationId(null);
    setReloadKey((key) => key + 1);
  }, []);

  const onConvocationDeleted = useCallback(() => {
    messageApi.success("Convocatoria eliminada");
    backToList();
  }, [messageApi, backToList]);

  const onConvocationUpdated = useCallback(() => {
    setEditingConvocation(null);
    messageApi.success("Convocatoria actualizada");
  }, [messageApi]);

  const today = dayjs().format("YYYY-MM-DD");

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
          onDeleted={onConvocationDeleted}
        />
      </div>
    );
  } else {
    content = (
      <div className="convocation-content">
        {!isEmpty(convocations) && (
          <div className="convocation-list__toolbar">
            <label className="convocation-list__control">
              Ordenar por
              <Select
                aria-label="Ordenar por"
                value={sortBy}
                onChange={setSortBy}
                options={LIST_CONVOCATIONS_SORT_OPTIONS.map(({ value, label }) => ({ value, label }))}
              />
            </label>
            <label className="convocation-list__control">
              Tipo
              <Select aria-label="Filtrar por tipo" value={typeFilter} onChange={setTypeFilter} options={TYPE_FILTER_OPTIONS} />
            </label>
            <label className="convocation-list__control">
              Estado
              <Select aria-label="Filtrar por estado" value={stateFilter} onChange={setStateFilter} options={STATE_FILTER_OPTIONS} />
            </label>
          </div>
        )}
        <div className="convocation-list">
          {visibleConvocations.map((convocation) => (
            <Card
              key={convocation.id}
              className="convocation-list__card"
              hoverable
              onClick={() => setSelectedConvocationId(convocation.id)}
            >
              <div className="convocation-list__card--title">{convocation.title}</div>
              {LIST_CONVOCATIONS_FIELDS.map(({ key, icon: Icon, render }) => (
                <div className={`convocation-list__card--item convocation-list__card--${key}`} key={key}>
                  <Icon />
                  <span className="convocation-list__card--text">{render(convocation)}</span>
                </div>
              ))}
              {convocation.state === "OPEN" && convocation.startDate > today && (
                <Tag className="convocation-list__card--opens" color="gold">
                  Abre el {formatDate(convocation.startDate)}
                </Tag>
              )}
            </Card>
          ))}
        </div>
        {isEmpty(visibleConvocations) && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="convocation-list__empty"
            description={isEmpty(convocations) ? "No hay convocatorias" : "No hay convocatorias con estos filtros"}
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
