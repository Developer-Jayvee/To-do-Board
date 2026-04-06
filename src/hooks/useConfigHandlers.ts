import { useState } from "react";
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
import type { CategoryReturnForm, ConfigType, LabelReturnForm } from "types/globalTypes";

export function useConfigHandlers() {
  let { category , labels } = configApi;
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState< CategoryReturnForm[]>(inititalCategoryReturnState);
  const [labelList , setLabelList] = useState <LabelReturnForm[]>( initialLabelReturnState);
  const [modalTitle, setModalTitle] = useState<string>("Category");
  const [configType, setConfigType] = useState<ConfigType>();
  const [formData, setFormData] = useState(inititalCategoryFormState || initialLabelFormState );
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
    
      
    } catch (error) {
      dispatch(setLoading(false))
    }finally{
      dispatch(setLoading(false))
      resetAll(fetchList);
    }

  };
  const handleUpdate = async () : Promise<boolean> => {
    if (!currentID) return true;
    const response = await mainRequest.update(currentID,formData);
    if(!response){
       resetAll();
       return true;
    }
    const returnID = response.id;
    let list = configType === "C" ? categoryList : labelList;
    let key =  list.findIndex( (val : any) => val.id === returnID);
    if(key !== undefined || key !== null){ 
      let setter = configType === "L" ? setLabelList : setCategoryList;
      setter(
        (prev) => 
          prev.map( (item,index) => index === key ? response : item)
      )
    }
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
      dispatch(setLoading(false));
    }finally{
      dispatch(setLoading(false));
      resetAll(false);
    }
  };
  const openModalOnUpdate = (id: number, type: ConfigType) => {
    let info;
    if(type === "C") info = categoryList.find((val: any) => val?.id === id);
    else if (type === "L") info = labelList.find((val: any) => val?.id === id);
    
    if (!info) return;

    setConfigType(type);
    setModalOpen(true);
    setCurrentID(id);
    setFormData({
      title: info.title,
    });
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
