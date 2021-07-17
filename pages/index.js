import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfielSidebar } from '../src/components/ProfileSidebar'
import { ProfileRelations } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommon';

const READ_ONLY_TOKEN = process.env.DATO_RO_API_KEY
const BASE_URL = process.env.VERCEL_URL

export default function Home(props) {
  const githubUser = props.githubUser;

  function parseDataFromGithub(target, setFunction) {
    React.useEffect(function() {
      fetch(`https://api.github.com/users/${githubUser}/${target}`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function(respostaCompleta) {
        setFunction(respostaCompleta);
      });
    }, []);
  }

  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [communities, setCommunities] = React.useState(props.communities);
  parseDataFromGithub('followers', setFollowers);
  parseDataFromGithub('following', setFollowing);

  return (
    <>
    {/* <body style={{
      'backgroundImage': 'url("https://wallpaperforu.com/wp-content/uploads/2021/04/Wallpaper-Video-Game-Art-Genshin-Impact-Xiao-2637x1461px51-scaled.jpg")',// no-repeat center center fixed; 
      'WebkitBackgroundSize': 'cover',
      'MozBackgroundSize': 'cover',
      'OBackgroundSize': 'cover',
      'backgroundSize': 'cover',
    }}> */}
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
            Criar comunidade
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
    {/* </body> */}
    </>
  )
}

export async function getServerSideProps(context) {
  const comunidades = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': READ_ONLY_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ "query": `query {
      allCommunities {
        id
        login
        image
        creatorSlug
      }
    }` })
  })
  .then(async(res)=>{
    const _ = await res.json();
    return _.data.allCommunities
  });

  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token)

  const isValid = await fetch(`${BASE_URL}/api/auth`, {
    headers: {
      Authorization: token
    }
  })
  .then(async(res) => {
    const _ = await res.json()
    return _.isAuthenticated
  })
  
  if (!isValid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: { 
      githubUser,
      communities: comunidades
    },
  }
}