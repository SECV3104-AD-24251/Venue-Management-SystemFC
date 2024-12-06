import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxBasic() {
    return (
      <Box component="section" sx={{ p: 2, border: '1px dashed grey', width: '200px',
        height: '100px',}}>
      </Box>
    );
  }