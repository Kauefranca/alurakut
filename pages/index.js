import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommon';

function ProfielSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'kauefranca';
  const pessoasFavoritas = [
    'juunegreiros',
    'peas',
    'omariosouto',
    'filipedeschamps',
    'higorfranca26',
    'guilhermesilveira'
  ];
  
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
          Bem Vindo(a)
        </h1>
        <OrkutNostalgicIconSet fas=1 confiavel=3 sexy=3/>
      </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
      <ProfileRelationsBoxWrapper>
        <h2 className='smallTitle'>
          Pessoas da comunidade ({pessoasFavoritas.length})
        </h2>

        <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return (
              <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
      <Box>
        Comunidades
      </Box>
      </div>
    </MainGrid>
    </>
  )
}
