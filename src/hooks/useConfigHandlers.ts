import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { configApi } from "services/modules/configApi";
import {
  initialLabelFormState,
  initialLabelReturnState,
  inititalCategoryFormState,
  inititalCategoryReturnState,
} from "src/constants/initialStates";
import { type AppDispatch } from "store";
import { setLoading } from "store/module/ModuleSlice";
import type { CategoryForm, CategoryReturnForm, ConfigType, LabelReturnForm } from "types/globalTypes";
import { nonCaseSensitiveSearch } from "utils/utilities";

export function useConfigHandlers() {
  let { category , labels } = configApi;
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState< CategoryReturnForm[]>(inititalCategoryReturnState);
  const [labelList , setLabelList] = useState <LabelReturnForm[]>( initialLabelReturnState);
  const [modalTitle, setModalTitle] = useState<string>("Category");
  const [configType, setConfigType] = useState<ConfigType>();
  const [formData, setFormData] = useState( initialLabelFormState );
  const [currentID, setCurrentID] = useState<number | null>(null);
  const [canSubmit,setCanSubmit] = useState<boolean>(false);
  const mainRequest = configType === "C" ? category : labels ;

  const createData = (type: ConfigType) => {
    setConfigType(type);
    setModalOpen(true);
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    let fetchList :boolean = true;
    try {
      const action = confirm("Are you sure you want to continue?");
      if(!action) return;
      let response;
      dispatch(setLoading(true));
  
      if(currentID) fetchList = await handleUpdate(); 
      else response = await mainRequest.create(formData);
    
      if(!fetchList) return;
    } catch (error) {
      dispatch(setLoading(false))
    }finally{
      dispatch(setLoading(false))
      resetAll(fetchList);
    }

  };
  const handleUpdate = async () : Promise<boolean> => {
    if (!currentID) return true;
    const copiedForm = Object.assign(formData)
    
    let list = configType === "C" ? categoryList : labelList;


    const isFormAlreadyExist = list.filter( (data) => data.id !== currentID).find((val) => {
      return nonCaseSensitiveSearch(val.title,formData.title)
    } )
   
    if(isFormAlreadyExist) {
      alert(`${formData.title} is already used`);
      return true;
    }
    const data = list.find((data) => data.id === currentID)?.title === formData.title;
    if(data) delete copiedForm.title;
    
    const response = await mainRequest.update(currentID,copiedForm);
    
    if(!response){
       resetAll();
       return true;
    }
    const returnID = response.id;
    let key =  list.findIndex( (val : any) => val.id === returnID);
   
    if(key !== undefined || key !== null){ 
      let setter = configType === "L" ? setLabelList : setCategoryList;
      setter(
        (prev) => 
          prev.map( (item,index) => index === key ? response : item)
      )
    }
    await alert('Successfully updated.');
    return false;
  };
  const handleDelete = async (id: number, type: ConfigType) => {
    try {
      const action = confirm("Are you sure you want to delete this category?");
      if (!action) return;
      if (!id) return;
      dispatch(setLoading(true));
      let response;
      if(type === "C") response = await category.delete(id);
      else if(type === "L") response = await labels.delete(id);
  
      let list = type === "C" ? categoryList : labelList;
      const setter = type === "C" ? setCategoryList :  setLabelList;
      if(list){
        setter( 
          (prev) => 
            prev.filter( (val : any) => val.id !== id )
        )
      };
    } catch (error) {
      alert('Error Occured').th
      dispatch(setLoading(false));
    }finally{
      alert('Successfully deleted')
      dispatch(setLoading(false));
      resetAll(false);
    }
  };
  const openModalOnUpdate = (id: number, type: ConfigType) => {
    let info;
    if(type === "C") info = categoryList.find((val: any) => val?.id === id);
    else if (type === "L") info = labelList.find((val: any) => val?.id === id);
    
    if (!info) return;
    
    console.log({
       title: info.title,
      bgColor:info.bgColor ?? "#ffffff",
      textColor:info.textColor ?? "#000000"
    });
    
    setConfigType(type);
    setModalOpen(true);
    setCurrentID(id);
    setFormData((prev) => ({
      ...prev,
      title: info.title,
      bgColor:info.bgColor ,
      textColor:info.textColor 
    }));
  };
  const fetchConfigList = async ( ) => {
    const response = await mainRequest.all();
    if(configType === "C") setCategoryList(response);
    else if (configType === "L") setLabelList(response);
  }
  const getAllList = async (removeCategoryOpen = true) => {
    const category = await configApi.category.all(removeCategoryOpen);
    const label = await configApi.labels.all();
    setCategoryList(category);
    setLabelList(label);
  }
  const retrieveAllList = async () => {
    const categoryResponse = await category.all();
    const labelResponse = await labels.all();
    setCategoryList(categoryResponse);
    setLabelList(labelResponse);
  };

  const resetAll = (retrieveAllList : boolean = true ) => {
    if(retrieveAllList) fetchConfigList();
    setFormData(inititalCategoryFormState);
    setCurrentID(null);
    setConfigType("");
    setModalOpen(false);
    dispatch(setLoading(false));
  };

  return {
    createData,
    handleSubmit,
    handleUpdate,
    handleDelete,
    openModalOnUpdate,
    retrieveAllList,
    resetAll,
    isModalOpen,
    setModalOpen,
    categoryList,
    setCategoryList,
    labelList,
    setLabelList,
    modalTitle,
    setModalTitle,
    configType,
    setConfigType,
    formData,
    setFormData,
    currentID,
    setCurrentID,
    fetchConfigList,
    getAllList,
    setCanSubmit,
    canSubmit
  };
}
