import { useEffect, useState } from 'react';
import Select from 'react-select';

import { FormWrapper } from './styles';

interface IApis {
  value: number;
  label: string;
}

const Form: React.FC = (): React.ReactElement => {
  const [apis, setApis] = useState<IApis[]>([]);

  const fetchApis = (): void => {
    setApis([
      { value: 1, label: 'Primeira API' },
      { value: 2, label: 'Segunda API' },
      { value: 3, label: 'Terceira API' }
    ])
  }

  useEffect(() => {
    fetchApis()
  }, [])

  return (
    <FormWrapper>
      <h1>APIs IntergrALL</h1>
      <form>
        <div>
          <label htmlFor="api-name">Selecione a API:</label>
          <Select
            id="api-name"
            options={apis}
          />
        </div>
      </form>
    </FormWrapper>
  )
}

export default Form
