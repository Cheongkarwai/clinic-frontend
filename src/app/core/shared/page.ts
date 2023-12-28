interface Search{
    value:string
    columns:string[]
}

interface Filter{
    filters:any[]
}

interface Page{
    first:number | null
    after:string | null
    last:number | null
    before:string | null
}

interface TableCriteria{
    search:Search
    filter:Filter
    page:Page
}

export {Search,Filter,Page,TableCriteria}