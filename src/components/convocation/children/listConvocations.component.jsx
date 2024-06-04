import { useEffect, useState } from "react";
import { Card, Empty } from "antd";
import { isEmpty } from "lodash";
import { getAllConvocations } from "../../../services/convocation.service";
import { LIST_CONVOCATIONS_ICONS } from "../../../schema/listConvocation.schema";

const ListConvocations = () => {
  const [convocations, setConvocations] = useState([]);

  useEffect(() => {
    const fetchConvocations = async () => {
      const data = await getAllConvocations();
      if (data != undefined) setConvocations(data);
    };
    fetchConvocations();
  }, []);

  return (
    <>
      <div className="convocation-list">
        {!isEmpty(convocations) &&
          convocations.map(({ title, ...convocation }, index) => {
            const keys = Object.keys(LIST_CONVOCATIONS_ICONS);
            return (
              <Card key={index} className="convocation-list__card">
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
