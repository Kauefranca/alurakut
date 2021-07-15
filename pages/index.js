import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
// import fetcher from 'node-fetch';
import { ProfielSidebar } from '../src/components/ProfileSidebar'
import { ProfileRelations } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommon';

const READ_ONLY_TOKEN = process.env.NEXT_PUBLIC_RO_DATOCMS_API_SECRET

export default function Home() {
  const githubUser = 'kauefranca';

  function parseDataFromDato(selector, setFunction) {  
    React.useEffect(function() {
      fetch('https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${READ_ONLY_TOKEN}`,
          },
          body: JSON.stringify({
            query: `{ ${selector} { name id image } }`
          }),
        }
      )
      .then((response) => response.json())
      .then((allResponse) => {
        setFunction(allResponse.data[selector])})
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
            name: dadosForm.get('title'),
            image: dadosForm.get('image'),
            creatorSlug: githubUser,
          }
          fetch('/api/comunidades',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCommunity)
          })
          .then(async(response) => {
            const dados = await response.json()
            const comunidades = dados.newCommunity;
            setCommunities([...communities, comunidades])
          })
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
        <ProfileRelations className='users' title='Seguidores' items={followers}>
        </ProfileRelations>
        <ProfileRelations className='users' title='Seguindo' items={following}>
        </ProfileRelations>
        <ProfileRelations className='communities' title='Comunidades' items={communities}>
        </ProfileRelations>
      </div>
    </MainGrid>
    </>
  )
}