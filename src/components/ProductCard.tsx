import React, { memo } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Grid } from "@mui/material";
import { Product, ProductCardProps } from "../types/product";

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <Grid item lg={2.4} key={product.id}>
      <Card sx={{ width: 170, maxWidth: "100%", boxShadow: "lg" }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 100 }}>
            <img src={product.thumbnail} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">{product?.category}</Typography>
          <Link
            href="#product-card"
            color="neutral"
            textColor="text.primary"
            overlay
            endDecorator={<ArrowOutwardIcon />}
            sx={{ fontWeight: "md" }}
          >
            {product?.title}
          </Link>

          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: "m" }}
            endDecorator={
              <Chip component="span" size="sm" variant="soft" color="success">
                Lowest price
              </Chip>
            }
          >
            {product?.price}
          </Typography>
        </CardContent>
        <CardOverflow>
          <Button
            variant="solid"
            color="danger"
            size="lg"
            onClick={() => addToCart(product.id)}
          >
            Add to cart
          </Button>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default memo(ProductCard);
