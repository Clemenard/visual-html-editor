import './BlocksToolbox.css'
import {ToolboxConfiguration} from "../../toolboxconfig"
import BlocksCategory from './BlocksCategory'
import {Droppable} from "react-beautiful-dnd";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {switchEditorMode} from "../../store/features/editors/HTMLEditors";

function BlocksToolbox({categories}: ToolboxConfiguration) {
  const editorMode = useAppSelector(state => state.visualHTMLReducer.type)
  const dispatch = useAppDispatch()
  return (
    <Droppable droppableId={'toolbox-dropzone'} isDropDisabled={false}>
      {provided => (
        <div
          className={'toolbox'}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {categories.map(category => {
            return (
              <BlocksCategory
                key={category.id}
                id={category.id}
                name={category.name}
                highlight={category.highlight}
                blocks={category.blocks}
                openDesc={category.openDesc}
              />
            )
          })}
          {/* TODO Move input */}
          <input
            type={"checkbox"}
            id={'editor-mode-toggle'}
            onChange={() => dispatch(switchEditorMode())}
          />
          <label htmlFor={'editor-mode-toggle'}>Toggle Visual/Textual</label>
        </div>
      )}
    </Droppable>
  )
}

export default BlocksToolbox