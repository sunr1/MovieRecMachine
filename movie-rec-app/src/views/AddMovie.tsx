import React, { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";

function AddMovie() {
  const [input, setInput] = useState({
    title: '',
    tagline: '',
    homepage: '',
    budget: 0,
    ogLang: '',
    ogTitle: '',
    overview: '',
    popularity: '',
    prodComps: '',
    prodCountries: '',
    releaseDate: '',
    revenue: 0,
    runtime: 0,
    langs: '',
    status: '',

    // Required fields not in form
    adult: false,
    imdb_id: '',
    vote_average: 0,
    vote_count: 0,
    video: false
  });

  function handleChange(e: any) {
    setInput({
      ...input,
      [e.target.name]: [e.target.value]
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    console.log('submit');
  }

  return (
    <Container>
      <h1>Add a Movie to the DB</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input name='title' value={input.title} onChange={handleChange} placeholder='Star Wars' />
        </Form.Field>
        <Form.Field>
          <label>Tagline</label>
          <input name='tagline' value={input.tagline} onChange={handleChange} placeholder='A long time ago in a galaxy far, far away...' />
        </Form.Field>
        <Form.Field>
          <label>Homepage</label>
          <input name='homepage' value={input.homepage} onChange={handleChange} placeholder='starwars.com' />
        </Form.Field>
        <Form.Field>
          <label>Budget</label>
          <input name='budget' value={input.budget} onChange={handleChange} placeholder='$100,000' />
        </Form.Field>
        <Form.Field>
          <label>Original Language</label>
          <input name='ogLang' value={input.ogLang} onChange={handleChange} placeholder='en' />
        </Form.Field>
        <Form.Field>
          <label>Original Title</label>
          <input name='ogTitle' value={input.ogTitle} onChange={handleChange} placeholder='OG Star Wars' />
        </Form.Field>
        <Form.Field>
          <label>Overview</label>
          <input name='overview' value={input.overview} onChange={handleChange} placeholder='So this guy is in the desert and then robots...' />
        </Form.Field>
        <Form.Field>
          <label>Popularity (1 - 50 scale where 50 is most popular)</label>
          <input name='popularity' value={input.popularity} onChange={handleChange} placeholder='42.149697' />
        </Form.Field>
        <Form.Field>
          <label>Production Companies</label>
          <input name='prodComps' value={input.prodComps} onChange={handleChange} placeholder='Lucasfilms' />
        </Form.Field>
        <Form.Field>
          <label>Production Countries</label>
          <input name='prodCountries' value={input.prodCountries} onChange={handleChange} placeholder='USA' />
        </Form.Field>
        <Form.Field>
          <label>Release Date</label>
          <input name='releaseDate' value={input.releaseDate} onChange={handleChange} placeholder='1977-05-25' />
        </Form.Field>
        <Form.Field>
          <label>Revenue</label>
          <input name='revenue' value={input.revenue} onChange={handleChange} placeholder='$1000000000' />
        </Form.Field>
        <Form.Field>
          <label>Runtime (minutes)</label>
          <input name='runtime' value={input.runtime} onChange={handleChange} placeholder='124 min' />
        </Form.Field>
        <Form.Field>
          <label>Spoken Languages</label>
          <input name='langs' value={input.langs} onChange={handleChange} placeholder='en' />
        </Form.Field>
        <Form.Field>
          <label>Status</label>
          <input name='status' value={input.status} onChange={handleChange} placeholder='Released' />
        </Form.Field>

        <Button primary type='submit'>Add Movie</Button>
      </Form>
    </Container>
  )
}

export default AddMovie;