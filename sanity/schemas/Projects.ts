export default {
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
        {
            name:'name',
            type:'string',
            title:'title'
        },
        {
            name:'description',
            type:'string',
            title:'description'
        },
        {
            name:'image',
            type:'image',
            title:'image'
        },
        {
            name:'tag',
            type:'string',
            title:'tag',
            
        },
        {
            name:'gitUrl',
            type:'url',
            title:'gitUrl'
        },
        {
            name:'previewUrl',
            type:'url',
            title:'previewUrl'
        },
    ]
}