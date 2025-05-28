import { Box, Typography } from '@mui/joy';

export const UniversalComponentsArticle = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography level="h1" sx={{ mb: 3 }}>
        What if components stopped pretending they were universal?
      </Typography>
      
      <Typography level="body-md" sx={{ mb: 2 }}>
        The illusion started with good intentions...
      </Typography>
      
      {/* Start writing here, worry about structure later */}
    </Box>
  );
};