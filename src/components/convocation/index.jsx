import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { getConvocationTypes, getRequirementTypes } from '../../services/convocation.service';

const CreateConvocation = () => {
  const [convocationTypes, setConvocationTypes] = useState([]);
  const [requirementTypes, setRequirementTypes] = useState([]);
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'requirements' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const convocationData = await getConvocationTypes();
        const requirementData = await getRequirementTypes();
        setConvocationTypes(convocationData);
        setRequirementTypes(requirementData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    const { startDate, endDate } = data;
    if (new Date(startDate) <= new Date() || new Date(endDate) <= new Date(startDate)) {
      setMessage('Start date must be in the future and end date must be at least one day after the start date.');
      return;
    }

    for (let req of data.requirements) {
      if (req.value <= 0 || req.value > 5.0) {
        setMessage('Requirement values must be greater than 0 and less than or equal to 5.0.');
        return;
      }
    }

    console.log('Form Data:', data);
    setMessage('Convocation created successfully!');
    reset();
  };

  return (
    <form className="container mb-3 d-flex">
      <div className="convocation-container col-md-6 ml-5 d-flex flex-column align-items-start">
        <h1 className="convocation-container__title">Crear convocatoria</h1>
          <div className="row  d-flex mb-3">
            <div className="col-md-4  d-flex flex-column align-items-start">
              <label htmlFor="convocationType" className="form-label">Tipo de convocatoria</label>
              <select id="convocationType" className="form-select" {...register('convocationType', { required: 'Convocation type is required' })}>
                <option value="">Seleccione</option>
                {convocationTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.convocationTypeName}
                  </option>
                ))}
              </select>
              {errors.convocationType && <div className="text-danger">{errors.convocationType.message}</div>}
            </div>

            <div className="col-md-8  d-flex flex-column align-items-start">
              <label htmlFor="title" className="form-label">Titulo</label>
              <input type="text" id="title" className="form-control" {...register('title', { required: 'Title is required' })} />
              {errors.title && <div className="text-danger">{errors.title.message}</div>}
            </div>
          </div>

          <div className="row d-flex mb-4">
            <div className="col d-flex flex-column align-items-start">
              <label htmlFor="startDate" className="form-label">Fecha Inicio</label>
              <input type="date" id="startDate" className="form-control" {...register('startDate', { required: 'Start date is required' })} />
              {errors.startDate && <div className="text-danger">{errors.startDate.message}</div>}
            </div>

            <div className="col d-flex flex-column align-items-start mb-4">
              <label htmlFor="endDate" className="form-label">Fecha Fin</label>
              <input type="date" id="endDate" className="form-control" {...register('endDate', { required: 'End date is required' })} />
              {errors.endDate && <div className="text-danger">{errors.endDate.message}</div>}
            </div>
          </div>

          <div className="mb-3 d-flex flex-column align-items-start">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea id="description" className="form-control" rows="3" {...register('description')}></textarea>
          </div>
          
        <button type="button" className="btn btn-success" onClick={handleSubmit(onSubmit)}>
          Create Convocation
        </button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>

      <div className="requirement-convocation-container md-6">
        <h1>Requerimientos Convocatoria</h1>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-3 border p-3 rounded">
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor={`requirements[${index}].convocationTypeName`} className="form-label">Requerimiento</label>
                <input type="number" value={`requirements[${index}].convocationTypeName`} id={`requirements[${index}].convocationTypeName`} className="form-control" step="0.1" {...register(`requirements[${index}].value`, { required: 'Value is required' })} />
                {errors.requirements && errors.requirements[index] && errors.requirements[index].value && (
                  <div className="text-danger">{errors.requirements[index].value.message}</div>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor={`requirements[${index}].value`} className="form-label">Valor</label>
                <input type="number" id={`requirements[${index}].value`} className="form-control" step="0.1" {...register(`requirements[${index}].value`, { required: 'Value is required' })} />
                {errors.requirements && errors.requirements[index] && errors.requirements[index].value && (
                  <div className="text-danger">{errors.requirements[index].value.message}</div>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor={`requirements[${index}].description`} className="form-label">Descripción</label>
                <input type="text" id={`requirements[${index}].description`} className="form-control" {...register(`requirements[${index}].description`)} />
              </div>

            </div>
            <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
              Remove Requirement
            </button>
          </div>
        ))}

      </div>

    </form>
  );
}


export { CreateConvocation };
