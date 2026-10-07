import { useEffect, useState } from "react";
import { Card, Empty } from "antd";
import { isEmpty } from "lodash";
import { getAllConvocations } from "../../../services/convocation.service";
import { LIST_CONVOCATIONS_ICONS } from "../../../schema/listConvocation.schema";
import ConvocationDetail from "./convocationDetail.component";

const ListConvocations = () => {
  const [convocations, setConvocations] = useState([]);
  const [selectedConvocationId, setSelectedConvocationId] = useState(null);

  useEffect(() => {
    const fetchConvocations = async () => {
      const data = await getAllConvocations();
      if (data != undefined) setConvocations(data);
    };
    fetchConvocations();
  }, []);

  if (selectedConvocationId !== null) {
    return (
      <ConvocationDetail
        convocationId={selectedConvocationId}
        onBack={() => setSelectedConvocationId(null)}
      />
    );
  }

  return (
    <>
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
    </>
  );
};

export default ListConvocations;
