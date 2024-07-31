import React, { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { Container, Typography } from "@mui/material";

const TestPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Show loader before starting the "load"
    showLoader();

    // Simulate a loading delay
    const loadData = async () => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate loaded data
      setData("Page Loaded");

      // Hide loader
      hideLoader();
    };

    loadData();
  }, [showLoader, hideLoader]);

  return (
    <Container>
      <Typography variant="h4">Test Page</Typography>
      {data && <Typography variant="h6">{data}</Typography>}
    </Container>
  );
};

export default TestPage;
