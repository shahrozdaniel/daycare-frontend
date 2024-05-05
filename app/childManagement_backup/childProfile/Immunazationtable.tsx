import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { Plus } from "lucide-react";
import DocsTable from "@/app/settings/components/DocsTable";
import { ToastContainer } from "react-toastify";
import Modal from "@/components/common/Modal/Modal";
import DocModal from "./childEditModal/DocModal";
import { childImmunazationList } from "@/services/childrenActionServices";
import RenderFile from "@/components/common/Utils/RenderFile";

const Immunazationtable: React.FC<any> = ({
  id,
  data,
  getChildData,
  open,
  setopen,
}) => {
  const [immunazation, setimmunazation] = useState<[]>([]);
  const [view, setView] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  console.log("data", data?.vaccinations);

  const TableData: any = [];
  data?.vaccinations?.map((ele: any) => {
    TableData.push({
      docid: ele?.id,
      document: ele?.document,
      type: ele?.type,
      vaccination_date: ele?.vaccination_date,
      reloadTable: getChildData,
      setView: setView,
      setUrl: setUrl,
    });
  });

  return (
    <>
      {TableData?.length > 0 ? (
        <div className="w-12/12 mx-auto mt-6 px-5">
          <DocsTable
            columns={columns}
            data={TableData}
            className="rounded-xl"
          />
        </div>
      ) : (
        <p className="text-center mb-4">No results found.</p>
      )}
      {/* {open && (
        <div>
          <Modal modalOpen={open} closeModal={() => setopen(!open)}>
            <DocModal
              closeModal={() => setopen(!open)}
              id={id}
              reloadTable={getChildData}
            />
          </Modal>
        </div>
      )} */}
      {view && (
        <div>
          <Modal modalOpen={view} closeModal={() => setView(false)}>
            <RenderFile closeModal={() => setView(false)} />
          </Modal>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Immunazationtable;
