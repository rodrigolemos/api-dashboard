import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';

import { FormWrapper } from './styles';

interface ISelect {
  value: number | string;
  label: string;
}

const Form: React.FC = (): React.ReactElement => {
  const [apis, setApis] = useState<ISelect[]>([]);
  const [additionalFilterOptions, setAdditionalFilterOptions] = useState<ISelect[]>([
    { value: 'header_req', label: 'Header de requisição' },
    { value: 'body_req', label: 'Body de requisição' },
    { value: 'header_res', label: 'Header de resposta' },
    { value: 'body_res', label: 'Body de resposta' },
    { value: 'code_res', label: 'Código de resposta' },
  ]);
  const [additionalFilters, setAdditionalFilters] = useState<ISelect[]>([]);

  const handleAddAdditionalFilter = (selectedOption: any) => {
    setAdditionalFilters([...additionalFilters, selectedOption])
    setAdditionalFilterOptions(
      additionalFilterOptions.filter(additionalFilterOption => additionalFilterOption.value !== selectedOption.value)
    )
  }

  const handleRemoveAdditionalFilter = (removeAdditional: ISelect) => {
    setAdditionalFilterOptions([...additionalFilterOptions, removeAdditional])
    setAdditionalFilters(
      additionalFilters.filter(additionalFilters => additionalFilters.value !== removeAdditional.value)
    )
  }

  const fetchApis = useCallback((): void => {
    setApis([
      { value: 1, label: 'Primeira API' },
      { value: 2, label: 'Segunda API' },
      { value: 3, label: 'Terceira API' }
    ])
  }, [])

  useEffect(() => {
    fetchApis()
  }, [fetchApis])

  return (
    <FormWrapper>
      <h1>APIs IntergrALL</h1>
      <form>

        <div className="row">
          <div className="col-full">
            <label htmlFor="name">Serviço</label>
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
            <input required type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="col-half">
            <div className="col-half">
              <label htmlFor="time-begin">Hora início</label>
              <input required type="time" id="time-begin" defaultValue={'00:00'} />
            </div>
            <div className="col-half">
              <label htmlFor="time-end">Hora fim</label>
              <input required type="time" id="time-end" defaultValue={'23:59'} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-full">
            <label htmlFor="add-filter">Filtros adicionais</label>
            <Select
              id="add-filter"
              options={additionalFilterOptions}
              onChange={handleAddAdditionalFilter}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-full">
            <ul>
              {additionalFilters.map((additionalFilter: ISelect) => (
                <li key={additionalFilter.value}>
                  <input type="text" required className="additional" placeholder={additionalFilter.label} />
                  <button className="secondary" onClick={() => handleRemoveAdditionalFilter(additionalFilter)}>Remover</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-full centered">
            <button type="submit" className="primary">Consultar</button>
          </div>
        </div>

      </form>
    </FormWrapper>
  )
}

export default Form
