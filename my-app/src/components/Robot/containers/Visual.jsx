import { useState } from 'react';

export const Visual = (props) => {

	let render_visual;
      switch(props.type){
        case "img":
            render_visual=(
                <img 
                    className='imgCard' 
                    src={props.src}  
                />
                );
        break;
        case "video":
              render_visual=(
              <object  width="100%" height="100%"
                        data={props.src}>
                </object>
                );
        break;
        default:
            render_visual=(
                <img 
                    className='imgCard' 
                    src={props.src}  
                />
                );
        break;
        }

    return(
        <div className="thumbnail">
                {render_visual}
        </div>
    );
}

export default Visual