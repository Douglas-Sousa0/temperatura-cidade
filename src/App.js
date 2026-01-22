import { useState, useEffect } from 'react'
import './style.css'
import Bloco from './components/Bloco'

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

    const key = process.env.REACT_APP_KEY // key da API
    const protocolo = process.env.REACT_APP_PROTOCOLO // HTTP ou HTTPS
  
    let url = `${protocolo}://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&aqi=no`

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Bloco topico='Temperatura' valor={dadosCidade.temperatura}/>
          <Bloco topico='Sensação Térmica' valor={dadosCidade.sensacao_termica}/>
          <Bloco topico='Vento' valor={dadosCidade.vento}/>
          <Bloco topico='Umidade' valor={dadosCidade.umidade}/>
        </div>
        
        <span>Dados obtidos em: {dadosCidade.horario_dados} (horário local)</span>
        <span>Desenvolvido por <a href='https://github.com/Douglas-Sousa0' target='_blank' rel='noreferrer'>Douglas</a> utilizando <a href="https://www.weatherapi.com/" title="Free Weather API" target='_blank' rel='noreferrer'>WeatherAPI.com</a></span>
      </div>
    </div>

  )
}

export default App
            