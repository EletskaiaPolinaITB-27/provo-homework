import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { axiosApi } from '../../axiosApi';
import type { IDishShort } from '../../types';

export const Dish = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState<IDishShort | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchDish = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await axiosApi.get<IDishShort | null>(`/dishes/${id}.json`);
      setDish(response.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchDish();
  }, [fetchDish]);

  const deleteDish = async () => {
    if (!id) return;

    setDeleting(true);
    try {
      await axiosApi.delete(`/dishes/${id}.json`);
      navigate('/');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!dish) {
    return (
      <Typography variant="h5" align="center">
        Dish not found
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {dish.name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Description: {dish.description}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Price: {dish.price} $
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={deleteDish}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </CardContent>
    </Card>
  );
};