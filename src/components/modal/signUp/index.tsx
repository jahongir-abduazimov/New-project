import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "@global-interface";
import { auth } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IModalProp extends ModalProps {
  email: string;
}

const index = ({ open, handleClose, email }: IModalProp) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = { code, email };
      const response = auth.auth_verify(payload);
      if (response.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-deskription"
      >
        <Box sx={style}>
          <Typography
            id='keep-mounted-modal-title'
            className="text-center"
            variant="h6"
            component="h2"
          >
            Parolni kiriting
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Parol"
              sx={{ marginY: "20px" }}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Tasdiqlash
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default index;
