import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function MovieDetails() {
  const [data, setData] = useState<any>({});
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/movie?id=${id}`)
      .then(res => {
        console.log('got', res.data);
        setData(res.data[0]);
      })
      .catch(err => {
        setData({
          error: `Sorry, we couldn't find any movies with ID: ${id}`
        })
      });
  }, [id]);

  function renderError() {
    // @ts-ignore
    if (data.error) {
      // @ts-ignore
      return <h1>{data.error}</h1>
    }

    return null
  }

  function detailChecker(key: string, i: number) {
    switch (key) {
      case 'adult':
        if (data[key] === 0) {
          return 'False'
        } else {
          return 'True'
        }
      case 'belongs_to_collection':
        if (data[key].trim().length > 0) {
          let collection = JSON.parse(data[key].replaceAll("'", '"'));
          return <p>{collection.name}</p>
        }

        return null
      case 'budget':
        const amount = data[key].toLocaleString('en-US',
          { maximumFractionDigits: 2 });
        return <p>${amount}</p>
      case 'genres':
        let genres = JSON.parse(data[key].replaceAll("'", '"'));
        return genres.map((genre: any) => (
          <p>{genre.name}</p>
        ));
      case 'production_companies':
        let companies = JSON.parse(data[key].replaceAll("'", '"'));
        return companies.map((co: any) => (
          <p>{co.name}</p>
        ));
      case 'production_countries':
        let countries = JSON.parse(data[key].replaceAll("'", '"'));
        return countries.map((country: any) => (
          <p>{country.name}</p>
        ));
      case 'spoken_languages':
        let langs = JSON.parse(data[key].replaceAll("'", '"'));
        return langs.map((lang: any) => (
          <p>{lang.name}</p>
        ));
      case 'runtime':
        return <p>{data[key]} minutes</p>
      default:
        return <p>{data[key]}</p>
    }
  }

  function renderDetails() {
    if (Object.keys(data).length > 1) {
      // @ts-ignore
      return Object.keys(data).map((key: string, i: number) => (
        <div key={i} style={{ marginBottom: '3rem' }}>
          <h3 style={{ paddingBottom: 0 }}>{key}</h3>
          {detailChecker(key, i)}
        </div>
      ));
    }

    return null;
  }

  return (
    <Container>
      {renderError()}
      {renderDetails()}
    </Container>
  )
}

export default MovieDetails