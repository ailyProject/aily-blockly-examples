const fs = require('fs');
const path = require('path');

// 读取程序集的package.json信息
function readSubjectInfo(subjectDir) {
  const packagePath = path.join(subjectDir, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    return {
      name: path.basename(subjectDir),
      nickname: path.basename(subjectDir),
      description: '',
      author: '',
      url: '',
      img: 'subject.png'
    };
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    return {
      name: packageJson.name || path.basename(subjectDir),
      nickname: packageJson.nickname || packageJson.name || path.basename(subjectDir),
      description: packageJson.description || '',
      author: packageJson.author || (typeof packageJson.author === 'object' ? packageJson.author.name : ''),
      url: packageJson.url || '',
      img: 'subject.png'
    };
  } catch (error) {
    console.error(`读取 ${subjectDir} 中的package.json出错:`, error.message);
    return {
      name: path.basename(subjectDir),
      nickname: path.basename(subjectDir),
      description: '',
      author: '',
      url: '',
      img: 'subject.png'
    };
  }
}

// 读取示例程序的package.json信息
function readExampleInfo(exampleDir, relativePath) {
  const packagePath = path.join(exampleDir, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    return {
      nickname: path.basename(exampleDir),
      description: '',
      path: relativePath,
      url: ''
    };
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    return {
      nickname: packageJson.nickname || packageJson.name || path.basename(exampleDir),
      description: packageJson.description || '',
      path: relativePath,
      url: packageJson.url || ''
    };
  } catch (error) {
    console.error(`读取 ${exampleDir} 中的package.json出错:`, error.message);
    return {
      nickname: path.basename(exampleDir),
      description: '',
      path: relativePath,
      url: ''
    };
  }
}

// 扫描目录中的程序集和示例程序
function generateIndex(rootDir) {
  const result = [];
  
  console.log(`正在扫描目录: ${rootDir}`);
  
  // 获取所有直接子目录（程序集）
  const dirs = fs.readdirSync(rootDir);
  
  for (const dir of dirs) {
    const subjectDir = path.join(rootDir, dir);
    
    // 跳过非目录、隐藏目录和特殊目录
    if (!fs.statSync(subjectDir).isDirectory() || 
        dir.startsWith('.') || 
        dir === 'node_modules') {
      continue;
    }
    
    // 检查是否存在subject.png，以确认这是一个程序集目录
    // const hasCoverImage = fs.existsSync(path.join(subjectDir, 'subject.png'));
    
    // if (!hasCoverImage) {
    //   console.log(`跳过 ${dir} - 未找到subject.png封面图片`);
    //   continue; // 不是程序集目录，跳过
    // }
    
    console.log(`找到程序集: ${dir}`);
    
    // 读取程序集信息
    const subjectInfo = readSubjectInfo(subjectDir);
    const examples = [];
    
    // 获取程序集中的所有直接子目录（示例程序）
    const exampleDirs = fs.readdirSync(subjectDir);
    
    for (const exampleDir of exampleDirs) {
      const fullExampleDir = path.join(subjectDir, exampleDir);
      
      // 跳过非目录、隐藏目录和特殊目录
      if (!fs.statSync(fullExampleDir).isDirectory() || 
          exampleDir.startsWith('.') || 
          exampleDir === 'node_modules') {
        continue;
      }
      
      // 检查是否存在project.abi文件，以确认这是一个示例程序目录
      const hasProjectFile = fs.existsSync(path.join(fullExampleDir, 'project.abi'));
      
      if (!hasProjectFile) {
        console.log(`  跳过 ${exampleDir} - 未找到project.abi文件`);
        continue; // 不是示例程序目录，跳过
      }
      
      console.log(`  找到示例程序: ${exampleDir}`);
      
      // 读取示例程序信息
      examples.push(readExampleInfo(fullExampleDir, exampleDir));
    }
    
    // 添加程序集和其示例程序到结果中
    result.push({
      ...subjectInfo,
      examples
    });
    
    console.log(`  已添加 ${examples.length} 个示例程序到 ${dir}`);
  }
  
  return result;
}

// 主函数
function main() {
  try {
    const rootDir = process.cwd(); // 使用当前工作目录
    const outputFile = path.join(rootDir, 'examples.json');
    
    const indexData = generateIndex(rootDir);
    
    fs.writeFileSync(outputFile, JSON.stringify(indexData, null, 2), 'utf8');
    console.log(`索引文件已生成: ${outputFile}`);
    console.log(`共找到 ${indexData.length} 个程序集，包含 ${indexData.reduce((sum, subject) => sum + subject.examples.length, 0)} 个示例程序。`);
  } catch (error) {
    console.error('生成索引时出错:', error);
    process.exit(1);
  }
}

// 执行主函数
main();