import Select from 'react-select';

import { FormWrapper } from './styles';

const Form: React.FC = (): React.ReactElement => {
  const options = [
    { value: 1, label: 'Primeira API' },
    { value: 2, label: 'Segunda API' },
    { value: 3, label: 'Terceira API' }
  ]

  return (
    <FormWrapper>
      <h1>Logs</h1>
      <form>
        <div>
          <label htmlFor="api-name">Selecione a API:</label>
          <Select
            id="api-name"
            options={options}
          />
        </div>
      </form>
    </FormWrapper>
  )
}

export default Form
