import { useState } from "react";
import { getRamdonDog } from "../../services/example.service";

const Example = () => {
  const [currentDog, setCurrentDog] = useState(null);

  const randomDog = () => {
    getRamdonDog()
      .then(({ message }) => {
        setCurrentDog(message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="example-container">
      <h2 className="example-container__title">The dog example</h2>
      {currentDog && (
        <img className="example-container__image" src={currentDog} />
      )}
      <button className="example-container__action" onClick={randomDog}>
        Fetch dog
      </button>
    </div>
  );
};

export default Example;
