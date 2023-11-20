import { Box, Button, CardContent, Divider, Grid, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { shopList } from './shopListData';
import BlankCard from '../ui/shared/BlankCard';
import Link from 'next/link';

const ShopList = () => {
  return (
    <Box display={"flex"} gap={"24px"} flexWrap={"wrap"}>
      {shopList.map((item) => {
        return (
          <Grid
            style={{ cursor: "pointer" }}
            item
            component={Link}
            href={'/reprice/userid/shop'}
            sm={12}
            lg={12}
            key={item.id}
          >
            <BlankCard className="hoverCard">
              <CardContent>
                <Stack direction={"column"} gap={4} alignItems="center">
                  <Box padding={"6px 24px"} textAlign={"center"}>
                    <Typography variant="h5">{item.name}</Typography>
                  </Box>
                </Stack>
              </CardContent>
              <Divider />
              <Box
                p={2}
                py={1}
                textAlign={"center"}
                sx={{ backgroundColor: "grey.100" }}
              >
                <Box justifyContent={"center"} display="flex" gap={2}>
                  <Button>
                    Открыть магазин
                  </Button>
                </Box>
              </Box>
            </BlankCard>
          </Grid>
        );
      })}
    </Box>
  )
}

export default ShopList