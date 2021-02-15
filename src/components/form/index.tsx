import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import ReactLoading from 'react-loading';
import { format } from 'date-fns';
import { IAPI, IRequest, ISelect } from './interfaces';
import { api } from '../../services/api';
import { additionalFilterDefaultOptions } from '../../utils/additionalFilterOptions'
import { FormWrapper } from './styles';

const Form: React.FC = (): React.ReactElement => {
  const [apis, setApis] = useState<ISelect[]>([]);
  const [additionalFilterOptions, setAdditionalFilterOptions] = useState<ISelect[]>(additionalFilterDefaultOptions);
  const [additionalFilters, setAdditionalFilters] = useState<ISelect[]>([]);
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

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

  const fetchApis = useCallback(async (): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    })

    try {

      const response = await api.get<IAPI[]>('/tables', {
        params: {
          data_cri: format(new Date(), 'yyyy-MM-dd')
        }
      })

      if (response.status !== 200)
        throw new Error('Não foi possível consultar as tabelas')

      const formattedAPIs = response.data.map((responseAPI: IAPI) => {
        const { api, name } = responseAPI;
        return {
          value: name,
          label: api
        }
      })

      setApis(formattedAPIs)

      setRequestStatus({
        isLoading: false,
        isError: false
      })

    } catch (error) {

      setRequestStatus({
        isLoading: false,
        isError: error.message
      })

    }

  }, [])

  useEffect(() => {
    fetchApis()
  }, [fetchApis])

  return (
    <FormWrapper>
      <h1>APIs IntergrALL</h1>
      <form>

        {requestStatus.isError && (
          <div className="row">
            <div className="col-full">
              <h2>{requestStatus.isError}</h2>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-full">
            <label htmlFor="name">Serviço</label>
            {!requestStatus.isLoading ? (
              <Select
                id="name"
                options={apis}
                required
              />
            ) : (
              <ReactLoading type="bubbles" color="#2684FF" height="42px" width="47px" />
            )}
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
                  <input
                    required
                    type="text"
                    className="additional"
                    placeholder={additionalFilter.label}
                  />
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
