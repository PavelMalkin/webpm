import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {updateCurrentProject } from "../../redux/actions/projectActions";
import CustomCard from "../basic/Card";
import EditableText from "../elementary/EditableText";
import CKEditor from "../elementary/CKEditor";

const Services = (props) => {
    const dispatch = useDispatch();
    const services = useSelector(store => store.project.currentProject.services)
    const currentProject = useSelector(store => store.project.currentProject)

    const handleSave = (data, index) => {
        dispatch(updateCurrentProject({index ,data}))
    }

    const card = (services.services)?
        Object.entries(services.services).map(res => {
            let title = <EditableText text={res[1].title} index={{item:'serviceTitle' ,id:res[0]}}  handleTextUpdate={handleSave}/>
            // let description = <CKEditor text={res[1].title} index={{item:'serviceDescription' ,id:res[0]}}  handleTextUpdate={handleSave}/>
            return <CustomCard data={res[1]}  title={title} handleFlyout={props.handleFlyout} index={{item:'serviceDescription' ,id:res[0]}} />
        })  : <div>No Services</div>;

    return (
        <div>
            <h1>{services.title}</h1>
            <h3>{services.subtitle}</h3>
            <div className="cards">
                {card}
            </div>
        </div>
    );
};

export default Services;