import Button, { RADIUS, VARIANT } from "../Button/Button.tsx";
import { Add } from "iconsax-react";
import Modal from "../Modal/Modal.tsx";
import { useState } from "react";

function Footer({ applyClick }: { applyClick: (text: string) => void }) {
  const [openModal, setOpenModal] = useState(false);

  const apply = (text: string) => {
    applyClick(text);
    setOpenModal(false);
  };

  return (
    <>
      <Button
        variant={VARIANT.FILL}
        icon={<Add color="white" />}
        onClick={() => setOpenModal(true)}
        radius={RADIUS.Round}
        style={{ justifySelf: "end" }}
      ></Button>

      {openModal && (
        <Modal
          applyClick={(text: string) => apply(text)}
          cancelClick={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

export default Footer;
