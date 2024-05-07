import Table from "../../components/ui/table";
import { useEffect, useState } from "react";
import serviceStore from "../../service/service";
import { getDataFromCookie } from "@data-service";
import { ServiceAdd, UpdateModal } from "../../components/modal";
import { ToastContainer, toast } from "react-toastify";

function Index() {
  const [data, setData] = useState([]);
  const user:any = getDataFromCookie("user");
  let arrIds: any[] = [];
  const [update, setUpdate] = useState({});
  const [updateModal, setUpdateModal] = useState(false);

  const thead = [
    { name: "checkbox", title: " ", class: "w-[30px] " },
    { name: "name", title: "Xizmat nomi", class: "w-[60px]" },
    { name: "price", title: "Narxi (so‘m)", class: "w-[120px]" },
    { name: "countuser", title: "Foydalanishlar soni", class: "w-[100px]" },
    { name: "buttons", title: "", class: "w-[300px]" }
  ];

  function checkedBox(e: any) {
    if (e.target.checked) {
      arrIds.push(e.target.id);
    } else {
      arrIds = arrIds.filter((item: any) => item !== e.target.id);
    }
  }

  async function getData() {
    try {
      const payload = {
        page: 1,
        limit: 10,
        owner_email: user
      };
      const response = await serviceStore.get(payload);
      console.log(response);
      if (response?.data?.services != null) {
        setData(response.data.services);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function updateData(e: any) {
    const payload = {
      id: e.id,
      owner_email: user,
      name: e.name,
      price: e.price
    };
    setUpdate(payload);
    setUpdateModal(true);
  }

  useEffect(() => {
    getData();
    setUpdateModal(false);
  }, []);

  async function deleteAllDatas() {
    try {
      if (arrIds.length) {
        for (let i = 0; i < arrIds.length; i++) {
          const response = await serviceStore.delete(arrIds[i]);
          if (response.status === 200) {
            toast.success("Mahsulotlar muvaffaqiyatli o'chirildi", { autoClose: 700 });
            setTimeout(() => {
              getData();
            }, 1600);
          }
        }
        arrIds = [];
      } else {
        toast.error("O'chirish uchun mahsulot topilmadi!", { autoClose: 1200 });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div>
        <div className="flex justify-end mb-5 gap-5">
          {updateModal && <UpdateModal getdata={getData} email={update} />}
          <button className="bg-[#e44040] py-[15px] px-[25px] rounded-lg text-[white] font-bold" onClick={deleteAllDatas}>Delete All</button>
          <ServiceAdd email={user} getdata={getData} />
        </div>
        <Table data={data} thead={thead} checkedBox={checkedBox} getData={getData} updateData={updateData} />
      </div>
    </>
  );
}

export default Index;
