import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import ReactLoading from 'react-loading';
import { format } from 'date-fns';
import { IAPI, IForm, IRequest, ISelect } from './interfaces';
import { api } from '../../services/api';
import { additionalFilterDefaultOptions } from '../../utils/additionalFilterOptions';
import { FormWrapper } from './styles';
import { useAPIData } from '../../hooks/logs'
import { useAPIInfo } from '../../hooks/api-info'

const Form = (): React.ReactElement => {
  const [apisOptions, setApisOptions] = useState<ISelect[]>([]);
  const [apis, setApis] = useState<IAPI[]>([]);
  const [additionalFilterOptions, setAdditionalFilterOptions] = useState<ISelect[]>(additionalFilterDefaultOptions);
  const [additionalFilters, setAdditionalFilters] = useState<ISelect[]>([]);
  const [formFilters, setFormFilters] = useState<IForm>({
    api: '',
    date: new Date(),
    startTime: '00:00',
    finishTime: '23:59',
    additionalFilters: []
  })
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const { fetchAPIData, clearQuery } = useAPIData();
  const { setAPIInfo } = useAPIInfo();

  const handleAddAdditionalFilter = (selectedOption: any): void => {
    setAdditionalFilters([...additionalFilters, selectedOption]);
    setAdditionalFilterOptions(
      additionalFilterOptions.filter(
        additionalFilterOption => additionalFilterOption.value !== selectedOption.value
      )
    );
  }

  const handleRemoveAdditionalFilter = (removeAdditional: ISelect): void => {
    setAdditionalFilterOptions([...additionalFilterOptions, removeAdditional]);
    setAdditionalFilters(
      additionalFilters.filter(additionalFilters => additionalFilters.value !== removeAdditional.value)
    );
    setFormFilters(prevState => {
      const additionalFilters = prevState.additionalFilters.filter(
        additional => additional.field !== removeAdditional.label
      )
      prevState.additionalFilters = additionalFilters
      return prevState
    })
  }

  const handleFormAPI = (selectedOption: any): void => {
    setFormFilters(prevState => {
      prevState.api = selectedOption.value
      return prevState
    })
    setAPIInfo(apis.filter(api => api.name === selectedOption.value)[0]);
    clearQuery();
  }

  const handleFormDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const element = e.currentTarget;
    const validDate = new Date(element.value).getTime();
    if (!isNaN(validDate) && validDate > 0) {
      setFormFilters(prevState => {
        if (new Date(element.value) > new Date()) {
          prevState.date = new Date()
        } else {
          prevState.date = new Date(`${element.value} 01:00`)
        }
        return prevState
      })
      fetchApis()
    }
  }

  const handleFormTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const element = e.currentTarget;
    setFormFilters(prevState => {
      if (element.id === 'startTime') {
        prevState.startTime = element.value
      } else {
        prevState.finishTime = element.value
      }
      return prevState
    })
  }

  const handleFormAdditional = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const element = e.currentTarget;
    setFormFilters(prevState => {

      // add new item to array
      // update item if it already exists
      let item = prevState.additionalFilters.find(additional => additional.field === element.id);

      if (!item) {
        prevState.additionalFilters.push({
          field: element.id,
          value: element.value
        })
      } else {
        item.value = element.value
        prevState.additionalFilters.map(additional => {
          if (additional.field === item?.field) {
            additional = item
          }
          return additional
        })
      }

      return prevState
    })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetchAPIData(formFilters)
  }

  const fetchApis = useCallback(async (): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {

      const response = await api.get<IAPI[]>('/tables', {
        params: {
          data_cri: format(formFilters.date, 'yyyy-MM-dd')
        }
      });

      if (response.status !== 200)
        throw new Error('Não foi possível consultar as tabelas');

      const formattedAPIs = response.data.map((responseAPI: IAPI) => {
        const { api, rota, name } = responseAPI;
        return {
          value: name,
          label: `${api} (${rota})`
        }
      });

      setApisOptions(formattedAPIs);

      setApis(response.data);

      setRequestStatus({
        isLoading: false,
        isError: false
      });

    } catch (error) {

      setRequestStatus({
        isLoading: false,
        isError: error.message
      });

    }

  }, [formFilters.date]);

  useEffect(() => {
    fetchApis();
  }, [fetchApis]);

  return (
    <FormWrapper>
      <h1>API Dashboard</h1>
      <form onSubmit={handleFormSubmit} onChange={clearQuery}>

        {requestStatus.isError && (
          <div className="row">
            <div className="col-full centered">
              <h2 className="error">{requestStatus.isError}</h2>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-half">
            <label htmlFor="date">Data</label>
            <input
              required
              type="date"
              id="date"
              defaultValue={formFilters.date.toISOString().split('T')[0]}
              onChange={handleFormDate}
            />
          </div>
          <div className="col-half">
            <div className="col-half">
              <label htmlFor="startTime">Hora início</label>
              <input
                required
                type="time"
                id="startTime"
                defaultValue={formFilters.startTime}
                onChange={handleFormTime}
              />
            </div>
            <div className="col-half">
              <label htmlFor="finishTime">Hora fim</label>
              <input
                required
                type="time"
                id="finishTime"
                defaultValue={formFilters.finishTime}
                onChange={handleFormTime}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-full">
            <label htmlFor="name">Serviço</label>
            {!requestStatus.isLoading ? (
              <div className="select-wrapper">
                <Select
                  id="api"
                  options={apisOptions}
                  onChange={handleFormAPI}
                  required
                />
              </div>
            ) : (
              <div className="select-wrapper">
                <ReactLoading type="bubbles" color="#2684FF" height="42px" width="47px" />
              </div>
            )}
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
                    id={additionalFilter.label}
                    className="additional"
                    placeholder={additionalFilter.label}
                    onChange={handleFormAdditional}
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
