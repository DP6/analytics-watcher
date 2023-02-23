import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 2,
      }}
    >
      <Box>
        <Button
          variant="contained"
          sx={{
            mx: 10,
            my: 0.5,
          }}
          onClick={() => navigate('/pagelist')}
        >
          Começar a Debugar
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          m: 2,
          height: '50%',
        }}
      >
        <iframe
          title="DP6"
          src="https://www.youtube.com/embed/VPbuUmIIubE?start=48"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="500px"
        ></iframe>

        <Box sx={{ mx: 10 }}>
          <big>
            <strong>Na DP6 você vai encontrar </strong>profissionais altamente
            qualificados, sempre dispostos a compartilhar seus conhecimentos e a
            ajudar a chegar na melhor solução. Há a possibilidade de trabalhar
            com clientes de diversos segmentos e com diferentes desafios
            relacionados a dados.
          </big>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
