import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfielSidebar } from '../src/components/ProfileSidebar'
import { ProfileRelations } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommon';

const token = process.env.NEXT_PUBLIC_RO_DATOCMS_API_SECRET

export default function Home() {
  const githubUser = 'kauefranca';

  function parseDataFromDato(selector, setFunction) {  
    React.useEffect(function() {
      fetch(
        'https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `{ ${selector} { name id href image } }`
          }),
        }
      )
      .then(function(resposta) {
        return resposta.json()
      })
      .then(function(TodaResposta) {
        setFunction(TodaResposta.data[selector])
      })
    }, [])
  }
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [communities, setCommunities] = React.useState([]);
  parseDataFromDato('allFollowers', setFollowers)
  parseDataFromDato('allFollowings', setFollowing)
  parseDataFromDato('allCommunities', setCommunities)

  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfielSidebar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
      <Box>
        <h1 className="title">
          Bem Vindo(a), {githubUser}
        </h1>
        <OrkutNostalgicIconSet fas="1" confiavel="3" legal="3"/>
      </Box>

      <Box>
        <h2 className="subTitle">O que você deseja fazer?</h2>
        <form onSubmit={((e) => {
          e.preventDefault();
          const dadosForm = new FormData(e.target);
          
          const newCommunity = {
            id: new Date().toISOString,
            title: dadosForm.get('title'),
            image: dadosForm.get('image')
          }
          setCommunities([...communities, newCommunity])
        })}>
          <div>
            <input
              placeholder="Qual vai ser o nome da sua comunidade."
              name="title"
              aria-label="Qual vai ser o nome da sua comunidade."
              type="text"
            />
          </div>
          <div>
            <input
              placeholder="Coloque uma URL para usarmos de capa."
              name="image"
              aria-label="Coloque uma URL para usarmos de capa."
            />
          </div>
          <button>
            Criar comunidade.
          </button>
        </form>
      </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelations className='followers' title='Seguidores' items={followers}>
        </ProfileRelations>
        <ProfileRelations className='following' title='Seguindo' items={following}>
        </ProfileRelations>
        <ProfileRelations className='communities' title='Comunidades' items={communities}>
        </ProfileRelations>
      </div>
    </MainGrid>
    </>
  )
}


// fetch('https://api.github.com/users/kauefranca')
// .then(function(info) {
//   if (info.ok) {
//     return info.json()
//   }
//   throw new Error(`Algo deu errado ${info.status}`)
// })
// .then(function(infoJson) {
//   console.log(infoJson)
// })