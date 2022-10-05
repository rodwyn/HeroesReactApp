import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"
import { getHeroesByName } from "../helpers/getHeroesByName";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const {searchText, onInputChange} = useForm({
    searchText: q
  });

  const onSearchSubmit = event => {
    event.preventDefault();
    // if (searchText.trim().length <= 0) return;

    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              aria-label="search"
              type="text"
              placeholder="search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            (q === '') 
            ? <div className="alert alert-primary animate__animated animate__fadeIn">Search a hero</div>
            : (heroes.length === 0)  && <div aria-label="not-hero" className="alert alert-danger animate__animated animate__fadeIn">Not hero with <b>{q}</b></div>
          }

          {
            heroes.map(hero => <HeroCard key={hero.id} {...hero} />)
          }

        </div>
      </div>
    </>
  )
}
