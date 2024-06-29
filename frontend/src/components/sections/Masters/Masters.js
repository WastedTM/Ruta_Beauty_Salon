import {MASTERS_INFO} from '../../../data/MainPageData'
import Master from "./Master";

function Masters(){
    return(
        <div className={"masters-container"}>
            <h3>Наші майстри</h3>
            <div className={"wrapper"}>
                {
                    MASTERS_INFO.map((item, key) => (
                        <Master item={item} key = {key}></Master>
                    ))
                }
            </div>
        </div>
    )
}

export default Masters;