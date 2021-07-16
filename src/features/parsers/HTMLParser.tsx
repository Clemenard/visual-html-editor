import {useAppSelector} from "../../hooks"
import {useEffect} from "react"
import {EditorType} from "../../editorconfig"
// @ts-ignore // TODO Remove when package is updated to re-enable TS types
import tinyhtml from "tiny-html-lexer"

// TODO Refactor to be generic parser component which will call parsing logic components for relevant lang
function HTMLParser() {
  const editorMode = useAppSelector(state => state.visualHTMLReducer.type)
   /* const visualHTMLCode = useAppSelector(state => state.visualHTMLReducer.codeElements) */
  const textualHTMLCode = useAppSelector(state => state.visualHTMLReducer.codeString)
  var errors:Array<String>=[]
  var open:Array<String>=[]

  function errorGen(code: any) { //TODO Type code
    errors=[]
    let stream = tinyhtml.chunks(code)
    validateHtmlCode()
    function validateHtmlCode() {
      
      const chunk = stream.next()
      /* console.log(chunk) */
      try{
      switch (chunk.value[0]) {
        case "startTagStart":
          open.push(chunk.value[1].substr(1))
          validateOpeningTag()
          validateHtmlCode()
          break
        case "newline":
        case "space":
        case "data":
        case "tagEnd":
          
          validateHtmlCode()
          break

          case "endTagStart":
            if(open.includes(chunk.value[1].substr(2))){
              open.splice(open.indexOf(chunk.value[1].substr(2)),1)
            }
            else{
              errors.push(`Want to close ${chunk.value[1].substr(2)} but never opened`)
            }
            validateOpeningTag()
            validateHtmlCode()
          break
        // Cases: tagEnd, commentStart, plainText, EOF
        default:
          throw new Error("Unexpected chunk")
      }}
      catch(e){}
    }

    function validateOpeningTag() {
      validateAttributes()
      const type = stream.next().value[0]
      console.log(type)
      switch (type) {
        case "tagEnd":
        case "tagEndClose":
          break
        default:
          errors.push(`Expected tagEnd or tagEndClose but got ${type}`)
          break
      }
    }


    function validateAttributes() {
      // spaces -> attributes
      // attribute -> attributes
      // nothing
    }

    function validateAttribute() {
      // attributeName, attributeAssign, attributeValueStart, attributeValueData, attributeValueEnd
    }
  }
  function listErrors(){
    if (editorMode === EditorType.Textual) {
      errorGen(textualHTMLCode)
    } else {
      console.log("In visual mode... cannot read code yet")
    }
    console.log(errors.length)
    let items:Array<any> = []
    errors.forEach((element, index) => {
      console.log(element)
            items.push(renderError(element,index))
        });
        return (
            <div>
                {items}
            </div>
        )
  }
  function renderError(error:String,index:any){
    return (
      <div key={"error"+index}>
          {error}
      </div>
  )
  }

  useEffect(() => {
    if (editorMode === EditorType.Textual) {
      errorGen(textualHTMLCode)
    } else {
      console.log("In visual mode... cannot read code yet")
    }
  })

  return (
    <div className={'html-parser'}>{listErrors()}</div>
  )
}

export default HTMLParser