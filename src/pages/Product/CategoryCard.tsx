import React from "react";
import { Grid, Typography, Avatar, Paper, Skeleton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
interface CategoryCard {
  allCategories: Icart.Category[] | undefined;
  loadingCategories: boolean;
}
const CategoryGrid = (props: CategoryCard) => {
  const navigate = useNavigate();
  return (
    <>
      {props.loadingCategories ? (
        <Box sx={{ px: 2 }}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      ) : (
        <Paper
          // elevation={1}
          sx={{ py: 2, mx: 2, mt: 1, borderRadius: 2 }}
          variant="outlined"
        >
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            {props.allCategories &&
              props.allCategories.map((i, index) => (
                <Grid
                  item
                  xs={1}
                  sm={4}
                  md={3}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(ROUTE_PATH.categoryList.replace(":id", i._id));
                  }}
                >
                  <Avatar
                    src={i.image}
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                  />

                  <Typography variant="body2">{i.name}</Typography>
                </Grid>
              ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default CategoryGrid;
