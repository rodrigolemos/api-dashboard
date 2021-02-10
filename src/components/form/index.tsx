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

        <div className="row">

          <div className="col-full">
            <label htmlFor="name">Selecione a API</label>
            <Select
              id="name"
              options={apis}
              required
            />
          </div>

        </div>

        <div className="row">

          <div className="col-half">
            <label htmlFor="date">Data</label>
            <input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>

          <div className="col-half">
            <div className="col-half">
              <label htmlFor="time-begin">Hora início</label>
              <input type="time" id="time-begin" defaultValue={'00:00'} />
            </div>
            <div className="col-half">
              <label htmlFor="time-end">Hora fim</label>
              <input type="time" id="time-end" defaultValue={'23:59'} />
            </div>
          </div>

        </div>

      </form>
    </FormWrapper>
  )
}

export default Form
