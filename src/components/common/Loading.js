import ReactLoading from "react-loading";
const Loading = () => (
    <div style={{display:"flex",flexDirection:"column", alignContent:'center', alignItems:"center", justifyContent:'center', justifyItems:'center', marginTop:24}}>
      <h4 style={{}}>Carregando</h4>
      <br/>
   
          <ReactLoading type={'cubes'} color="black" />
        <div >
          <div>Aguarde um momento por favor</div>
        </div>

    </div>
  );
  
  export default Loading;