import ShowItem from "../../shared/ShowItem/ShowItem";
import {ADVANTAGES_INFO} from '../../../data/MainPageData'
function AdvantagesSection(){
    return(
        <div className={"advantages-sector"}>
            <div className={"wrapper"}>
                {ADVANTAGES_INFO.map((advantage, index) => (
                    ShowItem(advantage, index)
                ))}
            </div>
        </div>
    )
}

export default AdvantagesSection;