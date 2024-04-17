"use client";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { Container, Grid } from "@mui/material";
import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";

export default function Product({ params }: { params: { productId: string } }) {
    const customizer = useSelector((state: AppState) => state.customizer);
    const queryClient = useQueryClient();
    
    return (
        <Container sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
        }}>
            <Grid container>
                <Grid item md={6} xs={12}>
                    
                </Grid>
                <Grid item md={6} xs={12}>
                    
                </Grid>
            </Grid>
        </Container>
    );
};