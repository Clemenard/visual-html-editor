import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"
import {toggleCategoryAction} from "../../store/features/blocks/blocks"
import {useAppDispatch} from "../../hooks"
import {MutableRefObject, useRef} from "react";

function BlocksCategory(props: ToolboxCategory) {
  // TODO Handle description onClick
  const categoryBlocksRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  function toggleCategory(categoryId: Number, categoryRef: MutableRefObject<any>) {
    dispatch(toggleCategoryAction(categoryId, categoryRef))
  }

  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  return (
    <div className={'toolbox-category'} style={categoryStyle}>
      <span className={'toolbox-category-title'} onClick={() => toggleCategory(props.id, categoryBlocksRef)}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'} ref={categoryBlocksRef} style={{maxHeight: props.maxHeight + "px"}}>
        {props.blocks.map(block => {
          return (
            <Block
              key={block.id}
              tag={block.tag}
              paired={block.paired}
              desc={block.desc}
              id={undefined}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BlocksCategory