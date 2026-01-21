import { useState, useEffect } from 'react'
import './style.css'

function App(){
  const [cidade, setCidade] = useState('São Paulo')

  const [dadosCidade, setDadosCidade] = useState({
    vento: '',
    temperatura: '',
    sensacao_termica: '',
    umidade: '',
    horario_dados: ''
  })

  function api_weather(e){
    try{
      e.preventDefault()
    } catch(e){
      console.log('Ignorando o erro que ocorre ao renderizar a página pois o e.preventDefault() funciona apenas quando a função é chamada através do submit do formulário e não devido ao useEffect')
    }

    const key = '' // key da API
  
    let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&aqi=no`

    fetch(url)
    .then(r => r.json())
    .then(json => {
      console.log(json)

      setDadosCidade(
        {
          nome: json.location.name,
          vento: `${json.current.wind_kph} km/h`,
          temperatura: `${json.current.temp_c}°C`,
          sensacao_termica: `${json.current.feelslike_c}°C`,
          umidade: `${json.current.humidity}%`,
          horario_dados: json.current.last_updated,
          icone: json.current.icon,
        }
      )
    })
  }

  useEffect(() => {
    api_weather()
  },[])

  return(
    <div className='container'>
      <form onSubmit={api_weather}>
        <input 
        type='text'
        placeholder='Digite uma cidade'
        onChange={ e => setCidade(e.target.value)}
        required
        />

        <button type='submit'>Pesquisar</button>
      </form>

      <div className='divisor'></div>
      
      <div className='area_dados'>
        <h1>{dadosCidade.nome}</h1>

        <div className='blocos'>
          <div className='bloco_dado'>
            <span className='topico_bloco'>Temperatura</span>
            <span className='valor_topico'>{dadosCidade.temperatura}</span>
          </div>

          <div className='bloco_dado'>
            <span className='topico_bloco'>Sensação Térmica</span>
            <span className='valor_topico'>{dadosCidade.sensacao_termica}</span>
          </div>

          <div className='bloco_dado'>
            <span className='topico_bloco'>Vento</span>
            <span className='valor_topico'>{dadosCidade.vento}</span>
          </div>

          <div className='bloco_dado'>
            <span className='topico_bloco'>Umidade</span>
            <span className='valor_topico'>{dadosCidade.umidade}</span>
          </div>
        </div>

        
        <span>Dados obtidos em: {dadosCidade.horario_dados} (horário local)</span>

        <span>Desenvolvido por <a href='https://github.com/Douglas-Sousa0' target='_blank'>Douglas</a> utilizando <a href="https://www.weatherapi.com/" title="Free Weather API" target='_blank'>WeatherAPI.com</a></span>
      </div>
    </div>

  )
}

export default App
            