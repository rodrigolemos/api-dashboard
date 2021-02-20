import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import ReactLoading from 'react-loading';
import { IAPI, IForm, IRequest, ISelect } from './interfaces';
import { additionalFilterDefaultOptions } from '../../utils/additionalFilterOptions';
import { FormWrapper } from './styles';
import { useAPIDetail } from '../../hooks/api-detail';
import { useLogData } from '../../hooks/logs';
import { useAPIInfo } from '../../hooks/api-info';
import { mock } from '../../data/fake-apis';

const Form = (): React.ReactElement => {
  const [apisOptions, setApisOptions] = useState<ISelect[]>([]);
  const [apis, setApis] = useState<IAPI[]>([]);
  const [additionalFilterOptions, setAdditionalFilterOptions] = useState<ISelect[]>(additionalFilterDefaultOptions);
  const [additionalFilters, setAdditionalFilters] = useState<ISelect[]>([]);
  const [formFilters, setFormFilters] = useState<IForm>({
    api: '',
    additionalFilters: []
  })
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const { clearDetail } = useAPIDetail();
  const { fetchLogData, clearQuery } = useLogData();
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
    clearDetail();
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

  const clearForm = (): void => {
    clearQuery();
    clearDetail();
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetchLogData(formFilters)
  }

  const fetchApis = useCallback(async (): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {

      const apis = await mock(true, 2000);

      const formattedAPIs = apis.map((responseAPI: IAPI) => {
        const { name, route } = responseAPI;
        return {
          value: route,
          label: `${name} (${route})`
        }
      });

      setApisOptions(formattedAPIs);

      setApis(apis);

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

  }, []);

  useEffect(() => {
    fetchApis();
  }, [fetchApis]);

  return (
    <FormWrapper>
      <h1>API Dashboard</h1>
      <form onSubmit={handleFormSubmit} onChange={clearForm}>

        {requestStatus.isError && (
          <div className="row">
            <div className="col-full centered">
              <h2 className="error">{requestStatus.isError}</h2>
            </div>
          </div>
        )}

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
