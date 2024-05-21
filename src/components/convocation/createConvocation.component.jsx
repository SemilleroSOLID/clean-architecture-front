const CreateConvocation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [convocationType, setConvocationType] = useState('Scholarships');
  const [requirements, setRequirements] = useState([{ type: '', value: '', description: '' }]);
  const [message, setMessage] = useState('');

  const handleAddRequirement = () => {
    setRequirements([...requirements, { type: '', value: '', description: '' }]);
  };

  const handleRequirementChange = (index, field, value) => {
    const newRequirements = [...requirements];
    newRequirements[index][field] = value;
    setRequirements(newRequirements);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    if (startDate <= today || endDate <= startDate) {
      setMessage('Dates must be greater than today\'s date and the end date must be at least one day after the start date.');
      return;
    }

    for (let requirement of requirements) {
      if (requirement.type === 'Grade' && (requirement.value <= 0 || requirement.value > 5)) {
        setMessage('Grades must be between 0 and 5.');
        return;
      }
    }

    // Logic to send data to the backend would go here
    setMessage('The convocation has been successfully created.');
  };

  return (
    <div className="create-convocation-container">
      <h1>Create Convocation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="convocationType">Convocation Type:</label>
          <select
            id="convocationType"
            value={convocationType}
            onChange={(e) => setConvocationType(e.target.value)}
          >
            <option value="Scholarships">Scholarships</option>
            <option value="Assistantships">Assistantships</option>
            <option value="Residences">Residences</option>
          </select>
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        {requirements.map((requirement, index) => (
          <div key={index}>
            <div>
              <label htmlFor={`requirementType-${index}`}>Requirement Type:</label>
              <input
                type="text"
                id={`requirementType-${index}`}
                value={requirement.type}
                onChange={(e) => handleRequirementChange(index, 'type', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`requirementValue-${index}`}>Value:</label>
              <input
                type="number"
                id={`requirementValue-${index}`}
                value={requirement.value}
                onChange={(e) => handleRequirementChange(index, 'value', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`requirementDescription-${index}`}>Requirement Description:</label>
              <input
                type="text"
                id={`requirementDescription-${index}`}
                value={requirement.description}
                onChange={(e) => handleRequirementChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddRequirement}>Add Requirement</button>
        <button type="submit">Create Convocation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export { CreateConvocation };
