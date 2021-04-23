import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"

function BlocksCategory(props: ToolboxCategory) {
  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  function toggleCategory(e: MouseEvent) {
    // TODO Transfer toggled status to state and do something to avoid 'is possibly null' TS warning for e.target.nextElementSibling
    const categoryBlocksDiv = e.target.nextElementSibling
    let categoryBlocksDivInnerHeight = 0

    categoryBlocksDiv.childNodes.forEach((block: any) => {
      categoryBlocksDivInnerHeight += block.clientHeight
    })

    categoryBlocksDiv.classList.toggle('unrolled')
    categoryBlocksDiv.style = categoryBlocksDiv.classList.contains('unrolled') ? 'max-height: ' + categoryBlocksDivInnerHeight + 'px' : 'max-height: 0'
  }

  return (
    <div className={'toolbox-category'} style={categoryStyle}>
      <span className={'toolbox-category-title'} onClick={toggleCategory}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'}>
        {props.blocks.map(block => {
          return <Block key={block.id} tag={block.tag} paired={block.paired} desc={block.desc} id={undefined}/>
        })}
      </div>
    </div>
  )
}

export default BlocksCategory