import Profiletab from "components/ProfileTab";
const Postcomment = ({ comment, id }) => {

    return (<>
        <Profiletab id={id} />
        <div className="ps70">
            {comment}
        </div>
    </>)
};

export default Postcomment;