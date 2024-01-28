exports.homepage = async(req,res) => {
    
        const locals = {
          title: 'SGBLM',
          description: 'Free SGBLM User Management System'
        };
        res.render('index', locals);
}

exports.addDonante = async(req,res) => {
    
  const locals = {
    title: 'Agregar Nueva Donante - SGBLM',
    description: 'SGBLM'
  };
  res.render('donante/add', locals);
}