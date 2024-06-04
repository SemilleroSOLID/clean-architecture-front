import { useEffect, useState } from "react";
import {
  getRamdonDog,
} from "../../services/example.service";
import { getConvocationTypes } from "../../services/convocation.service";

const Example = () => {
  const [currentDog, setCurrentDog] = useState(null);
  const [convocationTypes, setConvocationTypes] = useState(null);

  const randomDog = () => {
    getRamdonDog()
      .then(({ message }) => {
        setCurrentDog(message);
      })
      .catch((error) => console.log(error));
  };

  const getConvocationsTypes = () => {
    getConvocationTypes()
      .then((data) => {
        console.log("convocations types", data);
        setConvocationTypes(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(convocationTypes);
  }, []);

  return (
    <div className="example-container">
      <h2 className="example-container__title">The dog example</h2>
      {currentDog && (
        <img className="example-container__image" src={currentDog} />
      )}
      <button className="example-container__action" onClick={randomDog}>
        Fetch dog
      </button>
      <button
        className="example-container__action"
        onClick={getConvocationsTypes}
      >
        Fetch Convocation Types
      </button>
      {convocationTypes && (
        <ul>
          {convocationTypes.map((convocationType) => (
            <li key={convocationType.id}>
              {convocationType.convocationTypeName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Example;
