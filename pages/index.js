import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfielSidebar } from '../src/components/ProfileSidebar'
import { ProfileRelations } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommon';

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '3424234234523',
    title: 'Eu odeio acordar cedo', 
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = 'kauefranca';
  const pessoasFavoritas = [{
    id: '0',
    title: 'Juu Negreiros',
    image: `https://github.com/juunegreiros.png`
  },
  {
    id: '1',
    title: 'Paulo Silveira',
    image: `https://github.com/peas.png`
  },
  {
    id: '2',
    title: 'Dev Soutinho',
    image: `https://github.com/omariosouto.png`
  },
  {
    id: '3',
    title: 'Filipe Deschamps',
    image: `https://github.com/filipedeschamps.png`
  },
  {
    id: '4',
    title: 'Higor França',
    image: `https://github.com/higorfranca26.png`
  },
  {
    id: '5',
    title: 'Gui Silveira',
    image: `https://github.com/guilhermesilveira.png`
  }];
  
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
          
          const comunidade = {
            id: new Date().toISOString,
            title: dadosForm.get('title'),
            image: dadosForm.get('image')
          }
          setComunidades([...comunidades, comunidade])
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
      <ProfileRelations className='amigos' title='Pessoas Favoritas' items={pessoasFavoritas}>
      </ProfileRelations>
      <ProfileRelations className='comunidades' title='Comunidades' items={comunidades}>
      </ProfileRelations>
      </div>
    </MainGrid>
    </>
  )
}